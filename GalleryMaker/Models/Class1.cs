using System.Collections.Generic;

namespace GalleryMaker.Models
{
    public class Cat
    {
        public int Id { get; set; }
        public string Name { get; set; }
    }
    public class Layout
    {
        public int Id { get; set; }
        public Cat Cat { get; set; }
        public string HtmlString { get; set; }
        public string Name { get; set; }
    }


    public class TempLists
    {
        public static List<Layout> Layouts = new List<Layout>();
        public static List<Cat> Cats = new List<Cat>();

        public static void Init()
        {
            if (Cats.Count == 0)
            {
                var c1 = new Cat
                {
                    Id = 1,
                    Name = "طرحهای پایه"
                };
                TempLists.Cats.Add(c1);

                var c2 = new Cat
                {
                    Id = 2,
                    Name = "طرحهای اینستاگرامی"
                };
                TempLists.Cats.Add(c2);

            }
            if (TempLists.Layouts.Count == 0)
            {
                var m1 = new Layout();
                m1.Cat = TempLists.Cats[0];
                m1.Id = 1;
                m1.Name = "fist layout";
                m1.HtmlString = " <div style='width:50px' class='testLdiv red draggable contextMenu fitBg' id='div1' ></div>" +
                                " <label class='text draggable contextMenu' id='lbl1' >Test Text</div>";
                TempLists.Layouts.Add(m1);

                var m2 = new Layout();
                m2.Cat = TempLists.Cats[0];
                m2.Id = 2;
                m2.Name = "second layout";
                m2.HtmlString = " <div class='col-sm-4 testLdiv red draggable contextMenu fitBg'  ></div>" +
                                " <div class='col-sm-4 testLdiv blue draggable contextMenu fitBg' > </div>";
                TempLists.Layouts.Add(m2);


                var m3 = new Layout();
                m3.Cat = TempLists.Cats[1];
                m3.Id = 3;
                m3.Name = "second layout";
                m3.HtmlString = " <div class='testLdiv red draggable contextMenu fitBg'   style='left: 226px;top: 119px; ' ></div>" +
                                " <div class='testLdiv yellow draggable contextMenu fitBg'  style='left:250px;top: 125px; '></div>" +
                                " <div class='testLdiv blue draggable contextMenu fitBg'  style='left:302px;top: 125px; '> </div>";
                TempLists.Layouts.Add(m3);
            }
        }
    }
    public class CatGroupedModel
    {
        public string CatName { get; set; }
        public List<Layout> Layouts { get; set; }
    }
}