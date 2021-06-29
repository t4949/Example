using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Runtime.Serialization;
using System.Text;
using System.Data;
using Service.Entities;

namespace Service
{

    public class Service1 : IService1
    {
        public User Login(string nvUserName, string nvPassword)
        {
            return User.Login(nvUserName, nvPassword);
        }
        public int Register(User user)
        {
            return User.Register(user);
        }
        public List<User> GetUsersByRole(int roleId)
        {
            return User.GetUsersByRole(roleId);
        }
        public List<SysTableRow> GetToolsList()
        {
            return SysTableRow.GetToolsList();
        }
        public List<SysTableRow> GetSysTableRow(int iTableId)
        {
            return SysTableRow.GetSysTableRow(iTableId);
        }
        public List<Pniot> GetPniot(int iUserId, bool isHistory)
        {
            return Pniot.GetPniot(iUserId, isHistory);
        }
        public bool AddPnia(Pniot pniot)
        {
            return Pniot.AddPnia(pniot);
        }

        public List<TaalichPniot> GetTaalichPnia(int iPniaId)
        {
            return TaalichPniot.GetTaalichPnia(iPniaId);
        }

        public bool saveTaalichPnia(int iPniaId, int iUserId, string nvTallichPniaContent)
        {
            return TaalichPniot.saveTaalichPnia(iPniaId, iUserId, nvTallichPniaContent);
        }

        public Pniot GetPnia(int iPniaId)
        {
            return Pniot.GetPnia(iPniaId);
        }

        public User GetUser(int iUserId)
        {
            return User.GetUser(iUserId);
        }
        public bool movePniaToHistory(int iPniaId)
        {
            return Pniot.movePniaToHistory(iPniaId);
        }

        public List<User> GetUsers()
        {
            return User.GetUsers();
        }
        public bool DeleteUser(int iRowId)
        {
            return User.DeleteUser(iRowId);
        }

        public List<Tool> GetToolsTable()
        {
            return Tool.GetToolsTable();
        }

        public Tool GetTool(int iToolId)
        {
            return Tool.GetTool(iToolId);
        }
        public bool DeleteTool(int iRowId)
        {
            return Tool.DeleteTool(iRowId);
        }
        public bool SaveTool(Tool tool)
        {
            return Tool.SaveTool(tool);
        }
        public int RePassword(string nvID, string nvPassword)
        {
            return User.RePassword(nvID, nvPassword);
        }
        public List<SysTableRow> GetSysTable()
        {
            return SysTableRow.GetSysTable();
        }
       public bool SaveSysTableRow(int iSysTableRowId, string nvSysTableRowName, int tableId)
        {
            return SysTableRow.SaveSysTableRow(iSysTableRowId, nvSysTableRowName, tableId);
        }
        public bool DeleteSysTableRow(int iSysTableRowId)
        {
            return SysTableRow.DeleteSysTableRow(iSysTableRowId);
        }
    }
}
