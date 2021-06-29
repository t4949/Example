using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Data;
using System.Data.SqlClient;
using System.Reflection;

namespace Service.Ultities
{
    public  static class objectGenrate
    {
        public static SqlConnection GetSqlConnection()
      {
           

SqlConnection conn = new SqlConnection();
            //של הסמינר
            //conn.ConnectionString = "data source=SQL-SERVER;initial catalog=systemfault;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework";
            //שלי בבית
     conn.ConnectionString =@"data source=USER\SQLEXPRESS;initial catalog=Systemfault;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework";
       //     conn.ConnectionString = @"data source=DESKTOP-CV21K50\MSSQLSERVER01;initial catalog=systemFault;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework";
//            conn.ConnectionString =
//"Data Source=USER\"SQLEXPRESS;" +
//"Initial Catalog=Systemfault;" +
//"User id=user/user1;" +
//"Password=Secret;";
            conn.Open();
            //string stringCon = System.Configuration.ConfigurationManager.ConnectionStrings["ConnStr"].ToString();
            //SqlConnection sqlConn = new SqlConnection(stringCon);
            //sqlConn.Open();
return conn;
        }
        
        public static DataSet ExecuteWithSqlParamsList(string storedProcedureName, List<SqlParameter> lstDbParamsIn)
        {

            using (SqlConnection conn = GetSqlConnection())
            {
                using (SqlCommand cmd = conn.CreateCommand())
                {
                    cmd.CommandText = storedProcedureName;
                    cmd.CommandType = System.Data.CommandType.StoredProcedure;
                   // cmd.Parameters.AddWithValue("@ParameterName", lstDbParamsIn.all);
                   // cmd.Parameters.Add()
                   // cmd.ExecuteReader();

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
      
        public static T ToObject<T>(this DataRow row) where T:new() {
            IList<PropertyInfo> properties = typeof(T).GetProperties().ToList();
            
            T item = CreateItemFromRow<T>(row, properties);
            return item;
        }

        public static List<T> ToList<T>(this DataTable table) where T : new()
        {
            IList<PropertyInfo> properties = typeof(T).GetProperties().ToList();
            properties = properties.Where(prop => prop.GetCustomAttributes(typeof(NoGetAttribute), false).Count()== 0).ToList();
            //prop.GetCustomAttributes(typeof(SetGetAttribute), true);
            List<T> result = new List<T>();

            foreach (var row in table.Rows)
            {
                var item = CreateItemFromRow<T>((DataRow)row, properties);
                result.Add(item);
            }

            return result;
        }
        private static T CreateItemFromRow<T>(DataRow row, IList<PropertyInfo> properties) where T : new()
        {
            T item = new T();
            foreach (var property in properties)
            {
                if (property.PropertyType == typeof(System.DayOfWeek))
                {
                    DayOfWeek day = (DayOfWeek)Enum.Parse(typeof(DayOfWeek), row[property.Name].ToString());
                    property.SetValue(item, day, null);
                }
                else
                {
                    if (row[property.Name] == DBNull.Value)
                        property.SetValue(item, null, null);
                    else
                        property.SetValue(item, row[property.Name], null);
                }
            }
            return item;
        }

    }
}