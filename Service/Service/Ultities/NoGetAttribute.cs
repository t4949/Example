using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Service.Ultities
{
    [AttributeUsage(AttributeTargets.Property)]
    public class NoGetAttribute: Attribute
    {
      
    }
}