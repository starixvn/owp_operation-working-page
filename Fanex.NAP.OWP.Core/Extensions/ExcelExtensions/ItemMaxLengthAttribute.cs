namespace Fanex.NAP.OWP.Core.Extensions.ExcelExtensions
{
    using System;

    [AttributeUsage(AttributeTargets.Class | AttributeTargets.Property)]
    public sealed class ItemMaxLengthAttribute : Attribute
    {
        public ItemMaxLengthAttribute(int size)
        {
            Size = size;
        }

        public int Size { get; }
    }
}
