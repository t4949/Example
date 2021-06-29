
using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Serialization;
using System.ServiceModel;
using System.ServiceModel.Web;
using System.Text;
using System.Data;
using Service.Entities;
namespace Service
{
    // NOTE: You can use the "Rename" command on the "Refactor" menu to change the interface name "IService1" in both code and config file together.
    [ServiceContract]
    public interface IService1
    {
     [OperationContract]
     [WebInvoke(
     Method = "POST",
     UriTemplate = "Login",
     BodyStyle = WebMessageBodyStyle.WrappedRequest,
     ResponseFormat = WebMessageFormat.Json,
     RequestFormat = WebMessageFormat.Json)]
    User Login(string nvUserName, string nvPassword);

    [OperationContract]
     [WebInvoke(
        Method = "POST",
        UriTemplate = "Register",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        int Register(User user);

        [OperationContract]
        [WebInvoke(
         Method = "POST",
         UriTemplate = "GetUsersByRole",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json)]
        List<User> GetUsersByRole(int iRoleId);

        [OperationContract]
        [WebInvoke(
          Method = "GET",
          UriTemplate = "GetToolsList",
          BodyStyle = WebMessageBodyStyle.WrappedRequest,
          ResponseFormat = WebMessageFormat.Json,
          RequestFormat = WebMessageFormat.Json)]
        List<SysTableRow> GetToolsList();

        [OperationContract]
        [WebInvoke(
         Method = "POST",
         UriTemplate = "GetPniot",
         BodyStyle = WebMessageBodyStyle.WrappedRequest,
         ResponseFormat = WebMessageFormat.Json,
         RequestFormat = WebMessageFormat.Json)]
        List<Pniot> GetPniot(int iUserId, bool isHistory);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetSysTableRow",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<SysTableRow> GetSysTableRow(int iTableId);

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "AddPnia",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool AddPnia(Pniot pniot);


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetTaalichPnia",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<TaalichPniot> GetTaalichPnia(int iPniaId);

       [OperationContract]
       [WebInvoke(
       Method = "POST",
       UriTemplate = "saveTaalichPnia",
       BodyStyle = WebMessageBodyStyle.WrappedRequest,
       ResponseFormat = WebMessageFormat.Json,
       RequestFormat = WebMessageFormat.Json)]
       bool saveTaalichPnia(int iPniaId, int iUserId, string nvTallichPniaContent);


       [OperationContract]
       [WebInvoke(
       Method = "POST",
       UriTemplate = "GetPnia",
       BodyStyle = WebMessageBodyStyle.WrappedRequest,
       ResponseFormat = WebMessageFormat.Json,
       RequestFormat = WebMessageFormat.Json)]
       Pniot GetPnia(int iPniaId);

     [OperationContract]
     [WebInvoke(
     Method = "POST",
     UriTemplate = "GetUser",
     BodyStyle = WebMessageBodyStyle.WrappedRequest,
     ResponseFormat = WebMessageFormat.Json,
     RequestFormat = WebMessageFormat.Json)]
     User GetUser(int iUserId);

    [OperationContract]
    [WebInvoke(
     Method = "POST",
     UriTemplate = "movePniaToHistory",
     BodyStyle = WebMessageBodyStyle.WrappedRequest,
     ResponseFormat = WebMessageFormat.Json,
     RequestFormat = WebMessageFormat.Json)]
     bool movePniaToHistory(int iPniaId);

     [OperationContract]
     [WebInvoke(
     Method = "GET",
     UriTemplate = "GetUsers",
     BodyStyle = WebMessageBodyStyle.WrappedRequest,
     ResponseFormat = WebMessageFormat.Json,
     RequestFormat = WebMessageFormat.Json)]
     List<User> GetUsers();


     [OperationContract]
     [WebInvoke(
     Method = "POST",
     UriTemplate = "DeleteUser",
     BodyStyle = WebMessageBodyStyle.WrappedRequest,
     ResponseFormat = WebMessageFormat.Json,
     RequestFormat = WebMessageFormat.Json)]
     bool DeleteUser(int iRowId);


        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetToolsTable",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<Tool> GetToolsTable();


        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "GetTool",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        Tool GetTool(int iToolId);

        [OperationContract]
        [WebInvoke(
      Method = "POST",
      UriTemplate = "DeleteTool",
      BodyStyle = WebMessageBodyStyle.WrappedRequest,
      ResponseFormat = WebMessageFormat.Json,
      RequestFormat = WebMessageFormat.Json)]
        bool DeleteTool(int iRowId);

        [OperationContract]
        [WebInvoke(
     Method = "POST",
     UriTemplate = "SaveTool",
     BodyStyle = WebMessageBodyStyle.WrappedRequest,
     ResponseFormat = WebMessageFormat.Json,
     RequestFormat = WebMessageFormat.Json)]
        bool SaveTool(Tool tool);

        [OperationContract]
        [WebInvoke(
    Method = "POST",
    UriTemplate = "RePassword",
    BodyStyle = WebMessageBodyStyle.WrappedRequest,
    ResponseFormat = WebMessageFormat.Json,
    RequestFormat = WebMessageFormat.Json)]
        int RePassword(string nvID, string nvPassword);

        [OperationContract]
        [WebInvoke(
        Method = "GET",
        UriTemplate = "GetSysTable",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        List<SysTableRow> GetSysTable();

        [OperationContract]
        [WebInvoke(
        Method = "POST",
        UriTemplate = "SaveSysTableRow",
        BodyStyle = WebMessageBodyStyle.WrappedRequest,
        ResponseFormat = WebMessageFormat.Json,
        RequestFormat = WebMessageFormat.Json)]
        bool SaveSysTableRow(int iSysTableRowId, string nvSysTableRowName, int tableId);

        [OperationContract]
        [WebInvoke(
     Method = "POST",
     UriTemplate = "DeleteSysTableRow",
     BodyStyle = WebMessageBodyStyle.WrappedRequest,
     ResponseFormat = WebMessageFormat.Json,
     RequestFormat = WebMessageFormat.Json)]
        bool DeleteSysTableRow(int iSysTableRowId);
    }
    


}


