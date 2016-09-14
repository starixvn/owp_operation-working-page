namespace Fanex.NAP.OWP.Core.Helpers
{
    using System;
    using System.Collections.Generic;
    using System.Linq;
    using System.Reflection;

    public static class TypeHelper
    {
        public static IDictionary<string, int> GetNameValues(Type constantType)
        {
            var fieldInfos = constantType
                .GetFields(BindingFlags.Public | BindingFlags.Static | BindingFlags.FlattenHierarchy)
                .Where(fi => fi.IsLiteral && !fi.IsInitOnly).ToList();

            var bettypes = new Dictionary<string, int>();

            foreach (var fieldInfo in fieldInfos)
            {
                bettypes.Add(fieldInfo.Name, (int)fieldInfo.GetValue(fieldInfo));
            }

            return bettypes;
        }
    }
}
