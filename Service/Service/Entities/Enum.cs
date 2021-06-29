using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Service.Entities
{
    public static class Enum
    {
       public enum Statues
        {
            snew = 21,
            treatment = 22,
            finish = 24,
       }
        public enum tSysTable
        {
            Faults=7,
            Statues = 5,
           
        }
        public enum statusRow
        {
            active=1,
            NoActive=0
        }
    }
}
