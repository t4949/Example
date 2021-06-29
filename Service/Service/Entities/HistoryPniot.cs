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
//[iPniaId] [int] IDENTITY(1,1) NOT NULL,

//    [iHistoryPniaPone] [int] NULL,
//	[iHistoryPniaMetapel] [int] NULL,
//	[dHistoryPniaDate] [datetime] NULL,
//	[iHistoryToolId] [int] NULL,
//	[iHistoryStatus] [int] NULL,
//	[iHistoryPriority] [int] NULL,
//	[iHistoryPniaId] [int] NULL,
//	[iHistoryPniaKind] [int] NULL,
namespace Service.Entities
{
    [DataContract]
    public class HistoryPniot
    {
        #region dataMember
        [DataMember]
        public int? iHistoryPniaId { get; set; }
        [DataMember]
        public DateTime? dHistoryPniaDate { get; set; }
        [DataMember]
        public string nvHistoryDepartmentName { get; set; }
        [DataMember]
        public string nvKindFaultName { get; set; }
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

        [NoGetAttribute]
        [DataMember]
        public int? iToolId { get; set; }

        [NoGetAttribute]
        [DataMember]
        public int? iFaultId { get; set; }

        [NoGetAttribute]
        [DataMember]
        public int? iStatuesId { get; set; }

        [NoGetAttribute]
        [DataMember]
        public int? iPriority { get; set; }

        [NoGetAttribute]
        [DataMember]
        public string nvdescription { get; set; }

        #endregion

        #region Methods
        public static List<Pniot> GetPniot(int iUserId)
        {
            Pniot Pniot = new Pniot();
            List<SqlParameter> lParams = new List<SqlParameter>();
            lParams.Add(new SqlParameter("@iUserId", iUserId));
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

        #endregion
    }





}