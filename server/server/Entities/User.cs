using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;


namespace server.Entities
{
        [DataContract]
    public class User
    {
        #region DataMember
            [DataMember]
        public string nvUserName { get; set; }
                [DataMember]
        public int iRoleId { get; set; }
        #endregion


        #region Methods
        public static User Login(string nvUserName, string nvPassword) {
            User user = new User();
            //go to DB 
            return user;
        }
        #endregion 
    }
}