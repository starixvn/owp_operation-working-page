namespace Fanex.NAP.OWP.Core.BaseClasses
{
    using System;
    using System.Collections;
    using System.Globalization;
    using System.Linq;
    using Data;
    using Data.Repository;
    using Extensions;
    using global::OWP.Resources;
    using Interfaces;
    using Model;

    public class BaseRepository : IBaseRepository
    {
        public OWPCommandResult UpdateData(ICriteria criteria, bool hasGetOutputParams = false)
        {
            using (var db = ObjectDbFactory.CreateInstance(criteria.GetSettingKey()))
            {
                var spParams = criteria.GetSpParams();
                db.ExecuteNonQuery(spParams);
                if (hasGetOutputParams)
                {
                    SetValueForOutputProperty(criteria, spParams);
                }

                return GetCommandResult(spParams);
            }
        }


        private static void SetValueForOutputProperty(ICriteria criteria, Hashtable hash)
        {
            var properties = criteria.GetType().GetProperties().Where(prop => Attribute.IsDefined(prop, typeof(OutputAttribute)));

            foreach (var property in properties)
            {
                if (property.CanWrite)
                {
                    var value = hash[property.Name.ToLower(CultureInfo.InvariantCulture)];
                    property.SetValue(criteria, value, null);
                }
            }
        }

        private OWPCommandResult GetCommandResult(Hashtable hash)
        {
            var errCode = hash["errcode"];
            var errMsg = hash["errmsg"];
            var code = 0;
            dynamic message = string.Empty;
            if (!(errCode is DBNull))
            {
                code = Convert.ToInt32(errCode, CultureInfo.InvariantCulture);
                message = code == 0 ? errMsg : ViewLang.ResourceManager.GetString("M" + code);
            }

            return new OWPCommandResult
            {
                Code = code,
                Message = message
            };
        }
    }
}