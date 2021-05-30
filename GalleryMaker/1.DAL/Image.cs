namespace PostcardMaker._1.DAL
{
    public class Image
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public long UserId { get; set; }
        public User User { get; set; }
    }
}