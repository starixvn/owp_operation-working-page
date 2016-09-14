namespace Fanex.NAP.OWP.EventManagement.Models.EventInfo
{
    public class FilterFieldModel
    {
        public int FieldId { get; set; }

        public string Name { get; set; }

        public string Text { get; set; }

        public bool IsRequired { get; set; }

        public bool IsHasValue { get; set; }
    }
}