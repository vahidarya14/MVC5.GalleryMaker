﻿using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using GalleryMaker._1.DAL;
using GalleryMaker._2.BLL;
using GalleryMaker.Models;
using Microsoft.AspNet.Identity;

namespace GalleryMaker.Views.Gallery
{
    public class GalleryController : Controller
    {
        AppDbContext _db = new AppDbContext();

        public long UserId => long.Parse(User.Identity.GetUserId());

        public static List<Layout> AllLayout = new List<Layout>();
        private string path;
        public GalleryController()
        {
            //TempLists.Init();
        }

        private void InitViews()
        {


            var cats = new List<CatGroupedModel>();
            foreach (var cat in TempLists.Cats)
            {
                var ls = TempLists.Layouts.Where(a => a.Cat.Id == cat.Id);
                var cg = new CatGroupedModel();
                cg.CatName = cat.Name;
                cg.Layouts = ls.ToList();
                cats.Add(cg);
            }
            ViewData["AllLayout"] = cats;
            ViewData["SlidShowImages"] = new Uploader(_db).LoadImages(UserId);
        }

        [Authorize]
        public ActionResult Index(int? id)
        {
            InitViews();


            var model = new Project();
            if (id.HasValue && id != 0)
                model = _db.Projects.FirstOrDefault(b => b.Id == id) ?? new Project();
            return View(model);
        }

        public ActionResult LoadLayOut(int id)
        {
            InitViews();

            var model = new Project();
            model.HtmlString = TempLists.Layouts.First(a => a.Id == id).HtmlString;
            return View("Index", model);
        }

        [Authorize]
        [Route("PhotoMgmt")]
        public ActionResult PhotoMgmt()
        {
            ViewData["SlidShowImages"] = new Uploader(_db).LoadImages(UserId);
            return View();
        }

        [Authorize]
        [HttpPost]
        [ValidateInput(false)]
        public async Task<JsonResult> SaveLayout(Project a)
        {
            a.HtmlString = a.HtmlString.Replace("\n\n", "").Trim();
            if (a.Id == 0)
            {
                a.UserId = UserId;
                _db.Projects.Add(a);
            }
            else
            {
                var olsP = _db.Projects.FirstOrDefault(b => b.Id == a.Id);
                if (olsP == null)
                {
                    a.UserId = UserId;
                    _db.Projects.Add(a);
                }
                else
                    olsP.HtmlString = a.HtmlString;
            }


            var res = await _db.SaveChangesAsync();
            return Json(a);
        }


        [Authorize]
        [HttpPost]
        public async Task<ActionResult> UploadImages(ICollection<HttpPostedFileBase> files)
        {

            var iii = await new Uploader(_db).AddFileToSlideShow(files);

            var imgs = new Uploader(_db).LoadImages(UserId);
            ViewData["SlidShowImages"] = imgs;


            _db.Images.AddRange(iii.ConvertAll(a => new Image { UserId = UserId, Name = a }).ToList());
            await _db.SaveChangesAsync();

            return RedirectToAction("PhotoMgmt");
        }

        [Authorize]
        [HttpPost]
        public async Task<ActionResult> RemoveImage(string name)
        {

            await new Uploader(_db).DeleteFileFromSlideShow(name, UserId);




            return RedirectToAction("PhotoMgmt");
        }






    }
}