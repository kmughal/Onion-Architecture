using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace App.Core
{
    public class KeyGenerator : IKeyGenerator
    {
        private static object locker = new object();
        public string GenerateKey()
        {
            lock (locker)
            {
                return Guid.NewGuid().ToString();
            }
        }
    }
}
