using System;

namespace VendingMachine.Application.Services
{
    public class MachineLockService
    {
        private readonly object _lock = new object();
        private DateTime? _lockTime;

        public string? CurrentToken { get; private set; }

        public bool TryLock(string token)
        {
            lock (_lock)
            {
                if (CurrentToken != null)
                {
                    if (CurrentToken != token && !((DateTime.Now - _lockTime)?.TotalMinutes >= 3)) return false;
                }

                CurrentToken = token;
                _lockTime = DateTime.Now;
                return true;
            }
        }

        public void Unlock(string token)
        {
            lock (_lock)
            {
                if (CurrentToken != token) return;
                CurrentToken = null;
                _lockTime = null;
            }
        }
    }
}