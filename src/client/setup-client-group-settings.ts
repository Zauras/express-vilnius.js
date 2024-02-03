import { IClientClass, IClientsGroupSettings } from "./types";

function setupClientsGroup(clients: IClientClass[], config: IClientsGroupSettings) {
  clients.forEach(client => {
    // Check and update the class prototype for new instances
    const originalBaseUri = client.prototype.baseUri || "";
    client.prototype.baseUri = `${config.uriPrefix}${originalBaseUri}`;

    // If a singleton instance already exists, update it directly
    if (client.instance) {
      // Assuming the singleton instance is stored on the class
      client.instance.baseUri = `${config.uriPrefix}${client.instance.baseUri || originalBaseUri}`;
    }
  });
}

export { setupClientsGroup };
