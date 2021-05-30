using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PostcardMaker.Models
{
    public class LoginModel
    {
        [Required]
        [DisplayName("نام کاربری")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [DisplayName("رمز")]
        public string Password { get; set; }

    }
    public class RegisterModel
    {
        [Required]
        [DisplayName("نام کاربری")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [DisplayName("رمز")]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [DisplayName("تکرار رمز")]
        [Compare("Password", ErrorMessage = "رمز و تکرار رمز  یکی نیست.")]
        public string ConfirmPassword { get; set; }
    }
}