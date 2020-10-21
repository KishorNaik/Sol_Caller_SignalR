using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Sol_Demo.Hubs
{
    public interface IChatClient
    {
        Task SendMessageToCallerJsMethod(string message);
    }

    public class ChatHub : Hub<IChatClient>
    {
        public async Task SendMessage(string message)
        {
            await base.Clients.Caller.SendMessageToCallerJsMethod(message);
        }
    }
}