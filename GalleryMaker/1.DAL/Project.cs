using System;

namespace GalleryMaker._1.DAL
{
    public class Project
    {
        public int Id { get; set; }
        public string HtmlString { get; set; }
        public string MainPnlCss { get; set; }
        public string Name { get; set; }
        public DateTime DateTime { get; set; } = DateTime.Now;


        public long UserId { get; set; }
        public User User { get; set; }
    }
}