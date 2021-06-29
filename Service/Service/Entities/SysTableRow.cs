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
    public class SysTableRow
    {
        #region DataMember
        [DataMember]
        public int iSysTableRowId { get; set; }
      
        [DataMember]
        public string nvSysTableRowName { get; set; }
        #endregion
     
        #region Methods
        public static List<SysTableRow> GetSysTableRow(int iTableId )
        {
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iTableId", iTableId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetSysTableRow", lParams);
                List<SysTableRow> SysTableRow = new List<SysTableRow>();
                SysTableRow = ds.Tables[0].ToList<SysTableRow>();
                return SysTableRow;
            }
            catch (Exception ex)
            {

                return null;
            }

        }
        
        public static List<SysTableRow> GetToolsList()
        {
            Tool tool = new Tool();
            List<SqlParameter> lParams = new List<SqlParameter>();
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetToolsList", lParams);
                //החזרה של ליסט של אוביקטים
                List<SysTableRow> tools = new List<SysTableRow>();
                tools = ds.Tables[0].ToList<SysTableRow>();
                //החזרה של אוביקט אחד
                //tool = ds.Tables[0].Rows[0].ToObject<Tool>();
                return tools;
            }
            catch (Exception ex)
            {

                return null;
            }

        }
        public static List<SysTableRow> GetSysTable()
        {
            List<SqlParameter> lParams = new List<SqlParameter>();
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetSysTable", lParams);
                //החזרה של ליסט של אוביקטים
                List<SysTableRow> ltables = new List<SysTableRow>();
                ltables = ds.Tables[0].ToList<SysTableRow>();
                //החזרה של אוביקט אחד
                //tool = ds.Tables[0].Rows[0].ToObject<Tool>();
                return ltables;
            }
            catch (Exception ex)
            {

                return null;
            }

        }
        public static bool SaveSysTableRow(int iSysTableRowId, string nvSysTableRowName,int tableId)
        {
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iSysTableRowId", iSysTableRowId));
            lParams.Add(new SqlParameter("@nvSysTableRowName", nvSysTableRowName));
            lParams.Add(new SqlParameter("@tableId", tableId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("SaveSysTableRow", lParams);

                //החזרה של ליסט של אוביקטים
                //List<SysTableRow> ltables = new List<SysTableRow>();
                //ltables = ds.Tables[0].ToList<SysTableRow>();
                //החזרה של אוביקט אחד
                //tool = ds.Tables[0].Rows[0].ToObject<Tool>();
                return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }
        public static bool DeleteSysTableRow(int iSysTableRowId)
        {
           
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iSysTableRowId", iSysTableRowId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("DeleteSysTableRow", lParams);


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