namespace VendingMachine.Application.Interfaces;

public interface IMachineLockService
{
    bool TryLock(string token);
    void Unlock(string token);
}