using System;
using System.Collections;
using System.Reflection;
using Fanex.Data;
using Fanex.Data.Repository;

namespace Fanex.NAP.OWP.Core.Extensions
{
    public static class ICriteriaExtensions
    {
        public static Hashtable GetSpParams(this ICriteria criteria)
        {
            var type = criteria.GetType();
            var properties = type.GetProperties(BindingFlags.Public | BindingFlags.Instance);
            var parameters = new Hashtable(StringComparer.OrdinalIgnoreCase);

            foreach (var property in properties)
            {
                var map = Attribute.GetCustomAttribute(property, typeof(SpParamAttribute)) as SpParamAttribute;
                var value = property.GetValue(criteria, null);

                if (map?.Ignored != true)
                {
                    var parameterName = string.IsNullOrWhiteSpace(map?.SqlParamName)
                        ? property.Name
                        : map.SqlParamName;

                    parameters.Add(parameterName, value);
                }
            }

            return parameters;
        }
    }
}
