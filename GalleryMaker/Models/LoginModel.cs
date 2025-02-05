﻿using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace PostcardMaker.Models
{
    public class LoginModel
    {
        [Required]
        [DisplayName("User Name")]
        public string UserName { get; set; }

        [Required]
        [DataType(DataType.Password)]
        [DisplayName("Password")]
        public string Password { get; set; }

    }
}