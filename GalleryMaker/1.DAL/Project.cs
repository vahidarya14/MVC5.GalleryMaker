namespace GalleryMaker._1.DAL
{
    public class Project
    {
        public int Id { get; set; }
        public string HtmlString { get; set; }
        public string Name { get; set; }

        public long UserId { get; set; }
        public User User { get; set; }
    }
}