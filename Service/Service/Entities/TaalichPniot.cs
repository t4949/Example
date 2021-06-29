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
    public class TaalichPniot
    {
        #region dataMember
        [DataMember]
        public int iTaalichPniatId { get; set; }
      
        [DataMember]
        public DateTime? TaalichPniaDate { get; set; }
        [DataMember]
        public int iTaalichPniaPone { get; set; }
     
        [DataMember]
        public string nvTaalichPniaContent { get; set; }
        [DataMember]
        public string nvTaalichPniaPoneName { get; set; }
      
        #endregion

        #region Methods
        public static List<TaalichPniot> GetTaalichPnia(int iPniaId)
        {
            List<TaalichPniot> lTaalichPnia = new List<TaalichPniot>();
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iPniaId", iPniaId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetTaalichPniot", lParams);
                lTaalichPnia = ds.Tables[0].ToList<TaalichPniot>();
            
                return lTaalichPnia;
            }
            catch (Exception ex)
            {

                return null;
            }

        }

        public static bool saveTaalichPnia(int iPniaId,int iUserId, string nvTallichPniaContent)
        {
          
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iPniaId",iPniaId));
            lParams.Add(new SqlParameter("@iUserId", iUserId));
            lParams.Add(new SqlParameter("@nvTallichPniaContent", nvTallichPniaContent));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("InsTaalichPniot", lParams);
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }

        
        #endregion
    }
    }

