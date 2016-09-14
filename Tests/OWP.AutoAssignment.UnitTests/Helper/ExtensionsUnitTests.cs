using OWP.AutoAssignment.Helper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Xunit;

namespace OWP.AutoAssignment.UnitTests.Helper
{
    public class ExtensionsUnitTests
    {
        [Theory]
        [InlineData("This is a sample string", "sample")]
        [InlineData("This is a sample string", "Sample")]
        public void CaseInsensitiveContains_ReturnTrue(string text, string value)
        {
            Assert.True(text.CaseInsensitiveContains(value));
        }

        [Theory]
        [InlineData("", "sample")]
        [InlineData("This is a sample string", "xxx")]
        public void CaseInsensitiveContains_ReturnFalse(string text, string value)
        {
            Assert.False(text.CaseInsensitiveContains(value));
        }

    }
}
