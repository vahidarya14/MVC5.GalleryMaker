using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Hosting;
using GalleryMaker._1.DAL;

namespace GalleryMaker._2.BLL
{
    public class Uploader
    {

        private const string SlidShowPath = @"/wwwroot/images/upload";
        private AppDbContext _db;
        public Uploader(AppDbContext env)
        {
            _db = env;
        }

        public List<string> LoadImages(long userId)
        {

            return _db.Images.Where(a => a.UserId == userId).Select(a => SlidShowPath+ "/" + a.Name).ToList();

            //var filePath = HostingEnvironment.MapPath("~" + SlidShowPath);
            //if (filePath == null) return new List<string>();


            //var di1 = Directory.GetFiles(filePath).ToList();
            //var di = di1.Select(a => SlidShowPath + "\\" + a.Split(new[] { "images\\upload\\" }, StringSplitOptions.None)[1]).ToList();

            //return di;
        }


        public async Task<List<string>> AddFileToSlideShow(ICollection<HttpPostedFileBase> files)
        {
            var lst = new List<string>();

            foreach (var file in files)
            {
                if (file == null) continue;

                var pic = Guid.NewGuid() + Path.GetFileName(file.FileName);
                var path = Path.Combine(HostingEnvironment.MapPath("~" + SlidShowPath), pic);
                // file is uploaded
                file.SaveAs(path);

                lst.Add(pic);

                // save the image path path to the database or you can send image 
                // directly to database
                // in-case if you want to store byte[] ie. for DB
                using (var ms = new MemoryStream())
                {
                    file.InputStream.CopyTo(ms);
                    byte[] array = ms.GetBuffer();
                }
            }

            return lst;
        }


        public async Task DeleteFileFromSlideShow(string img, long userId)
        {
            string filePath = HostingEnvironment.MapPath("~" + img);

            if (filePath != null)
            {
                File.Delete(filePath);
                var img2 = img.Split(new[] {"/"}, StringSplitOptions.RemoveEmptyEntries).ToList().Last();
                var imgs = _db.Images.Where(a => a.Name == img2 && a.UserId == userId).ToList();
                _db.Images.RemoveRange(imgs);
                await _db.SaveChangesAsync();
            }
        }
    }
}