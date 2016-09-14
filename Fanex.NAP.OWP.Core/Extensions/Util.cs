namespace Fanex.NAP.OWP.Core.Extensions
{
    using System;
    using System.Collections.Generic;

    public static class Util
    {
        public static Result<R> Map<T, R>(this Result<T> result, Func<T, R> mapper)
        {
            var success = result as Success<T>;
            if (success != null)
            {
                return new Success<R>(mapper(success.Value));
            }

            return new Failure<R>(((Failure<T>)result).Message);
        }

        public static void Iter<T>(this IEnumerable<T> source, Action<T> iterator)
        {
            foreach (var e in source)
            {
                iterator(e);
            }
        }
    }
}