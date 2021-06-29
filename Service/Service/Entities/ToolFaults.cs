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
    public class ToolFaults
    {
        #region DataMember
        [DataMember]
        public int iKindFaultId { get; set;}
        [DataMember]
        public int iToolId { get; set;}
        [DataMember]
        public string nvkindFault { get; set; }
        #endregion
        #region Methods
        public static List<ToolFaults> GetToolFaults(int iToolId)
        {
            ToolFaults tool = new ToolFaults();
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iToolId", iToolId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetToolFaults", lParams);
               
                List<ToolFaults> ToolFaults = new List<ToolFaults>();
                ToolFaults = ds.Tables[0].ToList<ToolFaults>();
               
                return ToolFaults;
            }
            catch (Exception ex)
            {

                return null;
            }

        }
        #endregion
    }
}