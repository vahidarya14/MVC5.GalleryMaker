using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;
using System.Web.Mvc;
using GalleryMaker._1.DAL;
using GalleryMaker._2.BLL;
using GalleryMaker.Models;
using Microsoft.AspNet.Identity;
using Microsoft.Owin.Security;

namespace GalleryMaker.Views.Home
{
    [Authorize]
    public class HomeController : Controller
    {
        AppDbContext _db = new AppDbContext();
        public long UserId => long.Parse(User.Identity.GetUserId());

        public ActionResult Index()
        {
            ViewData["Projects"] = _db.Projects.Where(a => a.UserId == UserId).ToList();
            return View();
        }

        [HttpPost]
        public async Task<JsonResult> RemoveProj(long id)
        {
            var p = _db.Projects.FirstOrDefault(a => a.Id == id);
            if (p.UserId == UserId)
            {
                _db.Projects.Remove(p);
                await _db.SaveChangesAsync();
            }

            return Json(new { });
        }



        #region login
        private IAuthenticationManager AuthenticationManager => HttpContext.GetOwinContext().Authentication;
        [AllowAnonymous]
        public ActionResult Login()
        {
            return View(new LoginModel { UserName = "a", Password = "123456" });
        }

        [HttpPost]
        [AllowAnonymous]
        public ActionResult Login(LoginModel model)
        {
            model.Password = model.Password.HashSHA1();
            var user = _db.Users.FirstOrDefault(a => a.UserName == model.UserName && a.Password == model.Password);
            if (user != null)
            {
                IdentitySignin(user, user.Id + "_" + user.UserName, true);
                return RedirectToAction("Index");
            }

            ModelState.AddModelError("", "نام کاربری یا رمز اشتباه");
            model.Password = "";
            return View(model);
        }
        void IdentitySignin(User appUserState, string providerKey = null, bool isPersistent = false)
        {
            var claims = new List<Claim>
            {
                // create required claims
                new Claim(ClaimTypes.NameIdentifier, appUserState.Id + ""),
                new Claim(ClaimTypes.Name, appUserState.UserName),

                // custom – my serialized AppUserState object
                new Claim("userState", appUserState.ToString())
            };

            var identity = new ClaimsIdentity(claims, DefaultAuthenticationTypes.ApplicationCookie);

            AuthenticationManager.SignIn(new AuthenticationProperties
            {
                AllowRefresh = true,
                IsPersistent = isPersistent,
                ExpiresUtc = DateTime.UtcNow.AddMinutes(30)
            }, identity);
        }

        public ActionResult LogOut()
        {
            AuthenticationManager.SignOut(DefaultAuthenticationTypes.ApplicationCookie,
                                           DefaultAuthenticationTypes.ExternalCookie);
            return RedirectToAction("Index");
        }



        #endregion


        #region register
        [AllowAnonymous]
        public ActionResult Register()
        {
            return View(new RegisterModel());
        }


        [HttpPost]
        [ValidateAntiForgeryToken]
        [AllowAnonymous]
        public ActionResult Register(RegisterModel model)
        {
            if (_db.Users.Any(a => a.UserName == model.UserName))
            {
                ModelState.AddModelError("", "چنین نام کاربری قبلا ثبت شده است");
                return View(model);
            }
            model.Password = model.Password.HashSHA1();
            _db.Users.Add(new User { UserName = model.UserName, Password = model.Password });
            _db.SaveChanges();
            return RedirectToAction("Index");
        }
        #endregion

    }
}