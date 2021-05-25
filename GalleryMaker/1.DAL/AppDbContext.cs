using System.Data.Entity;

namespace GalleryMaker._1.DAL
{
    public class AppDbContext : DbContext
    {
        public DbSet<User> Users { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<Image> Images { get; set; }
    }
}