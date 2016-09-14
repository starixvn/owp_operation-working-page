namespace OWP.Utils
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using System.Xml;
    using System.Xml.Linq;
    using System.Xml.Serialization;

    public static class XmlExtensions
    {
        public static string ToXmlString<T>(this T t) where T : class
        {
            var serializer = new XmlSerializer(typeof(T));
            var ns = new XmlSerializerNamespaces();
            ns.Add("", "");
            var settings = new XmlWriterSettings
            {
                OmitXmlDeclaration = true
            };
            using (var stringWriter = new StringWriter())
            {
                using (var writer = XmlWriter.Create(stringWriter, settings))
                {
                    serializer.Serialize(writer, t, ns);
                    return stringWriter.ToString();
                }
            }
        }

        public static string ToXmlString<T>(this IEnumerable<T> items)
        {
            var xEle = new XElement("Root",
                  from item in items
                  select new XElement("Row", ToXAttribute(item)));
            return xEle.ToString(SaveOptions.None);
        }

        private static IEnumerable<XAttribute> ToXAttribute<T>(T item)
        {
            var attributes = new List<XAttribute>();
            var listProperties = typeof(T).GetProperties(BindingFlags.Public | BindingFlags.Instance).
                 Where(x => !Attribute.IsDefined(x, typeof(XmlIgnoreAttribute)));

            foreach (var prop in listProperties)
            {
                var value = prop.GetValue(item, null);
                if (value != null)
                {
                    attributes.Add(new XAttribute(prop.Name, value));
                }
            }
            return attributes;
        }

        public static List<T> Parse<T>(this string xml)
        {
            var result = new List<T>();
            var serializer = new XmlSerializer(typeof(T));
            var xmlDoc = new XmlDocument();
            xmlDoc.LoadXml(xml);
            var rootElement = xmlDoc.ChildNodes[0];
            foreach (XmlElement childElement in rootElement)
            {
                using (var sr = new StringReader(childElement.OuterXml))
                {
                    result.Add((T)serializer.Deserialize(sr));
                }
            }

            return result;
        }

        public static T ParseXml<T>(this string xml) where T : class
        {
            var locker = new object();
            var stringReader = new StringReader(xml);
            var reader = new XmlTextReader(stringReader);
            try
            {
                var xmlSerializer = new XmlSerializer(typeof(T));
                lock (locker)
                {
                    var item = (T)xmlSerializer.Deserialize(reader);
                    reader.Close();
                    return item;
                }
            }
            catch
            {
                return default(T);
            }
            finally
            {
                reader.Close();
            }
        }
    }
}