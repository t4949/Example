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

namespace Service.Entities
{
    [DataContract]
    public class Pniot
    {
        #region dataMember
        [DataMember]
        public int? iPniaId { get; set; }
        [DataMember]
        public string dPniaDate { get; set; }
        [DataMember]
        public string nvDepartmentName { get; set; }
          [DataMember]
        public string nvFloorName { get; set; }
        [DataMember]
        public string nvRoomName { get; set; }
        [DataMember]
        public string nvStatusName { get; set; }
        [DataMember]
        public string nvPhoneName { get; set; }

        [DataMember]
        public string nvMetapelName { get; set; }

        [DataMember]
        public string nvKindToolName { get; set; }

        [NoGetAttribute]
        [DataMember]
        public int? iUserId { get; set; }

        [DataMember]
        public int? iToolId { get; set; }
        
        [DataMember]
        public string nvToolName { get; set; }

        [DataMember]
        public int? iStatuesId { get; set; }

         [DataMember]
        public int? iPriority { get; set; }

        [NoGetAttribute]
        [DataMember]
        public string nvdescription { get; set; }


        [DataMember]
        public string nvSubject { get; set; }

        #endregion

        #region Methods
        public static List<Pniot> GetPniot(int iUserId,bool isHistory)
        {
            Pniot Pniot = new Pniot();
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iUserId", iUserId));
            lParams.Add(new SqlParameter("@isHistory", isHistory));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetPniot", lParams);
                //החזרה של ליסט של אוביקטים
                List<Pniot> Pniots = new List<Pniot>();
                Pniots = ds.Tables[0].ToList<Pniot>();
                //החזרה של אוביקט אחד
                //user = ds.Tables[0].Rows[0].ToObject<User>();
                return Pniots;
            }
            catch (Exception ex)
                        {

                return null;
            }

        }

       
        public static bool AddPnia(Pniot pnia)
                    {
           
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iUserId", pnia.iUserId));
            lParams.Add(new SqlParameter("@iPniaId", pnia.iPniaId));
            lParams.Add(new SqlParameter("@dPniaDate", pnia.dPniaDate));
            lParams.Add(new SqlParameter("@iToolId", pnia.iToolId));
            lParams.Add(new SqlParameter("@iStatuesId", pnia.iStatuesId));
            lParams.Add(new SqlParameter("@iPriority", pnia.iPriority));
            lParams.Add(new SqlParameter("@nvTaalichPniaContent", pnia.nvdescription));
            lParams.Add(new SqlParameter("@nvSubject", pnia.nvSubject));

            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("AddPnia", lParams);

                return true;
            }
            catch (Exception ex)
            {

                return false;
            }


           
            }

        public static bool movePniaToHistory(int iPniaId )
        {
            Pniot Pniot = new Pniot();
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iPniaId", iPniaId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("movePniaToHistory", lParams);

                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }

        public static Pniot GetPnia(int iPniaId)
    {
            Pniot pnia = new Pniot();
        List<SqlParameter> lParams = new List<SqlParameter>();
        lParams.Add(new SqlParameter("@iPniaId", iPniaId));


        try
        {
            DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetPnia", lParams);
                pnia= ds.Tables[0].Rows[0].ToObject<Pniot>();
                return pnia;
        }
        catch (Exception ex)
        {

            return null;
        }

    
    }
#endregion
}





}