using System;
using System.Collections.Generic;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Runtime.Serialization;
using System.Web;
using Service.Ultities;
using Service.Entities;

namespace Service.Entities
{
    [DataContract]
    public class User
    {
        #region DataMember
        [DataMember]
        public int iUserId { get; set; }

        [DataMember]
        public string nvPassword { get; set; }
        [DataMember]
        public string nvLastName { get; set; }
        [DataMember]
        public string nvFirstName { get; set; }
        [DataMember]
        public int? iRoleId { get; set; }
       
        [DataMember]
        public string nvEmail { get; set; }

        
        [DataMember]
        public string nvUserName { get; set; }
        
        [DataMember]
        public string nvTel { get; set; }
        
        [DataMember]
        public int? iFloor { get; set; }
        
        [DataMember]
        public int? iRoom { get; set; }
        
        [DataMember]
        public int? iDepartment { get; set; }
        
        [DataMember]
        public string nvID { get; set; }

        [NoGetAttribute]
        [DataMember]
        public int? iStatusRow { get; set; }

        [DataMember]
        public string nvFloorName { get; set; }
      
        [DataMember]
        public string nvRoomName { get; set; }
       
        [DataMember]
        public string nvDepartmentName { get; set; }
       



        #endregion


        #region Methods
        public static User Login(string nvUserName, string nvPassword)
        {
            User user = new User();
            List<SqlParameter> lParams=new List<SqlParameter>();
            lParams.Add(new SqlParameter("@nvUserName",nvUserName));
            lParams.Add(new SqlParameter("@nvPassword",nvPassword));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("Login", lParams);
                //החזרה של ליסט של אוביקטים
                List<User> users = new List<User>();
                users = ds.Tables[0].ToList<User>();
                //החזרה של אוביקט אחד
                user = ds.Tables[0].Rows[0].ToObject<User>();
                return user;
            }
            catch (Exception ex)
            {

                return null;
            }
           
        }

        public static List<User> GetUsersByRole(int iRoleId)
        {
            User user = new User();
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iRoleId", iRoleId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetUserByRole", lParams);
                List<User> users = new List<User>();
                users = ds.Tables[0].ToList<User>();
                
                return users;
            }
            catch (Exception ex)
            {

                return null;
            }

        }

        public static int Register(User user)
        {
            
            int statues;
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@nvFirstName", user.nvFirstName));
            lParams.Add(new SqlParameter("@nvLastName", user.nvLastName));
            lParams.Add(new SqlParameter("@nvUserName", user.nvUserName));
            lParams.Add(new SqlParameter("@nvPassword", user.nvPassword));
            lParams.Add(new SqlParameter("@nvEmail", user.nvEmail));
            lParams.Add(new SqlParameter("@iUserId", user.iUserId));
            lParams.Add(new SqlParameter("@iRoleId", user.iRoleId));
            lParams.Add(new SqlParameter("@nvTel", user.nvTel));
            lParams.Add(new SqlParameter("@iFloor", user.iFloor));
            lParams.Add(new SqlParameter("@iRoom", user.iRoom));
            lParams.Add(new SqlParameter("@iDepartment", user.iDepartment));
            lParams.Add(new SqlParameter("@nvID", user.nvID));
            lParams.Add(new SqlParameter("@iStatusRow",(int)Enum.statusRow.active));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("AddUser", lParams);
                
                statues =int.Parse( ds.Tables[0].Rows[0][0].ToString());
                return statues;


                            }
            catch (Exception ex)
            {

                return 0;
            }

        }
        public static bool DeleteUser(int iRowId)
        {
            User user1 = new User();
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iRowId", iRowId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("DeleteUser", lParams);


                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }

        public static User GetUser(int iUserId )
        {
            User user1 = new User();
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iUserId", iUserId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetUser", lParams);

                user1 = ds.Tables[0].Rows[0].ToObject<User>();
                return user1;
            }
            catch (Exception ex)
            {

                return null;
            }
        }

        public static List<User> GetUsers() {
            List<User> users = new List<User>();
            List<SqlParameter> lParams = new List<SqlParameter>();
            
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetUsers", lParams);

                users = ds.Tables[0].ToList<User>(); 
                return users;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
        public static int RePassword(string nvID, string nvPassword)
        {
            string statues;
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@nvID", nvID));
            lParams.Add(new SqlParameter("@nvPassword", nvPassword));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("rePassword", lParams);

                statues = ds.Tables[0].Rows[0][0].ToString();
                return int.Parse(statues);
            }
            catch (Exception ex)
            {
                return 0;
            }

        }

        public static User LoginUser()
        {
            User user = new User();
            //go to DB 
            return user;
        }
        #endregion
    }
}