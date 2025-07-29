using VendingMachine.Application.Interfaces;

namespace VendingMachine.Application.Services
{
    public class MachineLockService : IMachineLockService
    {
        private readonly object _lock = new object();
        public string? CurrentToken { get; private set; }

        public bool TryLock(string token)
        {
            lock (_lock)
            {
                if (CurrentToken != null)
                {
                    if (CurrentToken != token)
                        return false;
                }

                CurrentToken = token;
                return true;
            }
        }

        public void Unlock(string token)
        {
            lock (_lock)
            {
                if (CurrentToken != token) return;
                CurrentToken = null;
            }
        }
    }
}