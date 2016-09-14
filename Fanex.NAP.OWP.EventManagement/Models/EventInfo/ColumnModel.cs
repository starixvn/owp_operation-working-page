namespace Fanex.NAP.OWP.EventManagement.Models.EventInfo
{
    public class ColumnModel
    {
        public int ColumnId { get; set; }

        public int? ParentColumnId { get; set; }

        public string Name { get; set; }

        public string Text { get; set; }

        public bool IsDefaultSelected { get; set; }

        public bool IsAlwayDisplay { get; set; }

        public bool IsChecked { get; set; }

        public int? DisplayOrder { get; set; }
    }
}