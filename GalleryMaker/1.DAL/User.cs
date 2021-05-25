using System.Collections.Generic;

namespace GalleryMaker._1.DAL
{
    public class User
    {
        public long Id { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public List<Project> Projects { get; set; }
        public List<Image> Images { get; set; }
    }
}