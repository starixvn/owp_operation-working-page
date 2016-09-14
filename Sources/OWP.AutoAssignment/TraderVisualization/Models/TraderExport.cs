using System;

namespace OWP.AutoAssignment.TraderVisualization.Models
{
    public class TraderExport
    {
        public string FileName { get; set; }
        public byte[] FileContent { get; set; }
        public string FileContentType { get; set; }

        public TraderExport(byte[] content)
        {
            FileName = $"Trader TimeTable{DateTime.Now.ToString("yyyyMMdd")}.xlsx";
            FileContentType = "application/xlsx";
            FileContent = content;
        }

        public TraderExport(string fileName, byte[] content)
        {
            FileName = fileName;
            FileContentType = "application/xlsx";
            FileContent = content;
        }
    }
}