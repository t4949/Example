using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
namespace server.Ulties
{
    public class objectGenrate
    {
        public SqlConnection GetSqlConnection()
        {
            string stringCon = System.Configuration.ConfigurationManager.ConnectionStrings["ConnStr"].ToString();
            SqlConnection sqlConn = new SqlConnection(stringCon);
            sqlConn.Open();
            return sqlConn;
        }
        
        public DataSet ExecuteWithSqlParamsList(string storedProcedureName, List<SqlParameter> lstDbParamsIn)
        {

            using (SqlConnection conn = GetSqlConnection())
            {
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = storedProcedureName;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;

                    if (lstDbParamsIn != null)
                    {
                      //  List<SqlParameter> sqlParameterInlst = AutoMapper.Mapper.Map<List<DbParams>, List<SqlParameter>>(lstDbParamsIn);
                        cmd.Parameters.AddRange(lstDbParamsIn.ToArray());
                    }

                    SqlDataAdapter da = new SqlDataAdapter();
                    DataSet ds = new DataSet();
               
                    da.SelectCommand = cmd;
                    da.Fill(ds);

                    return ds;
                }
            }
        }

    }
}