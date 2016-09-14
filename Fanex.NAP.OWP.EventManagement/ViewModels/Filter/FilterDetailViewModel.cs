namespace Fanex.NAP.OWP.EventManagement.ViewModels.Filter
{
    using Core.Extensions.XMLExtensions;

    [XMLName("Row")]

    public class FilterDetailViewModel
    {
        public int FieldId { get; set; }

        public int Operator { get; set; }

        public string Value { get; set; }
    }
}
