using Fanex.Logging;
using Fanex.NAP.OWP.Core.Configuration;
using Newtonsoft.Json;
using OWP.RabbitMQ.RequestModels;
using RabbitMQ.Client;
using System;
using System.Text;

namespace OWP.RabbitMQ
{
    public interface RabbitMqClient
    {
        void PublishRequestMessage(RequestBaseModel message);
    }

    public class RabbitMqClientImp : RabbitMqClient, IDisposable
    {
        private IModel channel;

        private IConnection connection;

        public void ConnectRabbitMq()
        {
            try
            {
                var connectionFactory = new ConnectionFactory
                {
                    UserName = AppSettings.RabbitMQUserName,
                    Password = AppSettings.RabbitMQPassword,
                    HostName = AppSettings.RabbitMQHosting,
                    Port = AppSettings.RabbitMQPort,
                    VirtualHost = AppSettings.RabbitMQVirtualHost,
                    DispatchConsumersAsync = true
                };
                connection = connectionFactory.CreateConnection();
                channel = connection.CreateModel();

                channel.QueueDeclare(
                    queue: AppSettings.RabbitMQRequestQueue,
                    durable: true,
                    exclusive: false,
                    autoDelete: false);
            }
            catch (Exception ex)
            {
                LogService.Error($"Connect RabbitMQ failed, exception: {ex}");
            }
        }

        public void PublishRequestMessage(RequestBaseModel message)
        {
            var json = JsonConvert.SerializeObject(message);
            var messageBytes = Encoding.UTF8.GetBytes(json);

            var props = channel.CreateBasicProperties();
            props.Type = message.RoutingKey;

            channel.BasicPublish(
                exchange: string.Empty,
                routingKey: AppSettings.RabbitMQRequestQueue,
                basicProperties: props,
                body: messageBytes);
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        protected virtual void Dispose(bool isDisposing)
        {
            if (channel != null && channel.IsOpen)
            {
                channel?.Close();
                channel?.Dispose();
            }

            if (connection != null && connection.IsOpen)
            {
                connection?.Close();
                connection?.Dispose();
            }
        }
    }

    public static class RabbitMqClientExtension
    {
        public static RabbitMqClient Initialize(this RabbitMqClientImp client)
        {
            client.ConnectRabbitMq();
            return client;
        }
    }
}