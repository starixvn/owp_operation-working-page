namespace Fanex.NAP.OWP.Core.Extensions
{
    public class Success<T> : Result<T>
    {
        public Success(T value)
        {
            Value = value;
        }

        public T Value { get; }
    }
}