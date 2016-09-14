namespace Fanex.NAP.OWP.Core.Extensions
{
    public class Failure<T> : Result<T>
    {
        public Failure(string message)
        {
            Message = message;
        }

        public string Message { get; }
    }
}