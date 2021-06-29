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
    public class Tool
    {
        #region DataMember
        [DataMember]
        public int iToolId { get; set; }
        [DataMember]
        public string nvToolName { get; set; }
        [DataMember]
        public int? iNumFault { get; set; }
        [DataMember]
        public string dcreateDate { get; set; }
        [DataMember]
        public int? iFloor { get; set; }
        [DataMember]
        public int? iRoom { get; set; }
        [DataMember]
        public int? iDepartment { get; set; }
        [DataMember]
        public int? iCompany { get; set; }
        [DataMember]
        public int? iKindToolId { get; set; }
        [DataMember]
        public int? iStatusRow { get; set; }
        [DataMember]
        public string nvFloorName { get; set; }
        [DataMember]
        public string nvRoomName { get; set; }
        [DataMember]
        public string nvDepartmentName { get; set; }
        [DataMember]
        public string nvCompanyName { get; set; }
        [DataMember]
        public string nvKindToolName { get; set; }

        #endregion
        //        iToolId,nvToolName,iNumFault,dcreateDate,
        //iFloor,iRoom,iDepartment,iCompany,iKindToolId,iStatusRow,t1.nvSysTableRowName as nvFloorName,t2.nvSysTableRowName as nvRoomName,t3.nvSysTableRowName as nvDepartmentName ,
        //t4.nvSysTableRowName as nvCompanyName,t5.nvSysTableRowName as nvKindToolName

        #region Methods
        public static List<Tool> GetToolsTable()
        {
            List<Tool> tools = new List<Tool>();
            List<SqlParameter> lParams = new List<SqlParameter>();

            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetToolsTable", lParams);

                tools = ds.Tables[0].ToList<Tool>();
                return tools;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
        public static Tool GetTool(int iToolId)
        {
            Tool tool = new Tool();
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iToolId", iToolId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("GetTool", lParams);

                tool = ds.Tables[0].Rows[0].ToObject<Tool>();
                return tool;
            }
            catch (Exception ex)
            {

                return null;
            }
        }
        public static bool DeleteTool(int iRowId)
        {
            Tool tool = new Tool();
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iRowId", iRowId));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("DeleteTool", lParams);
                 return true;
            }
            catch (Exception ex)
            {

                return false;
            }

        }
        public static bool SaveTool(Tool tool)
        {
           
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iToolId", tool.iToolId));
            lParams.Add(new SqlParameter("@nvToolName", tool.nvToolName));
            lParams.Add(new SqlParameter("@iFloor", tool.iFloor));
            lParams.Add(new SqlParameter("@iRoom", tool.iRoom));
            lParams.Add(new SqlParameter("@iDepartment", tool.iDepartment));
            lParams.Add(new SqlParameter("@iKindToolId", tool.iKindToolId));
            lParams.Add(new SqlParameter("@iNumFault", tool.iNumFault));
            lParams.Add(new SqlParameter("@iCompany", tool.iCompany));
            lParams.Add(new SqlParameter("@dcreateDate", tool.dcreateDate ));
            lParams.Add(new SqlParameter("@iStatusRow", (int)Enum.statusRow.active));
            try
            {
                DataSet ds = objectGenrate.ExecuteWithSqlParamsList("SaveTool", lParams);

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