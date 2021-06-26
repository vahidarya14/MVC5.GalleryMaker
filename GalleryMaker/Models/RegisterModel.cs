using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PostcardMaker.Models
{
    public class RegisterModel
    {
        [Required]
        [DisplayName("User Name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [DisplayName("Password")]
        public string Password { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [DisplayName("Confirm Password")]
        [Compare("Password", ErrorMessage = "رمز و تکرار رمز  یکی نیست.")]
        public string ConfirmPassword { get; set; }
    }
}