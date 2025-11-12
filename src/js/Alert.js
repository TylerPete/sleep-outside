/**
* @description This class is used to display alerts on the page.
* It is used to display alerts from the alerts.json file.
* @author Erik German
* @example
* const alert = new Alert();
* alert.init();
**/
export default class Alert {

    constructor() {
        this.alertsPath = '/json/alerts.json';
    }
    /**
    * @description This method is used to initialize the alert class.
    **/
    async init() {
        try {
            const response = await fetch(this.alertsPath);
            if (!response.ok) {
                return;
            }

            const alerts = await response.json();

            if (!alerts || alerts.length === 0) {
                return;
            }

            // Create the alert section
            const alertSection = document.createElement('section');
            alertSection.className = 'alert-list';

            // Loop through alerts and create p elements
            alerts.forEach(alert => {
                const alertParagraph = document.createElement('p');
                alertParagraph.textContent = alert.message;

                // Apply background and foreground colors
                if (alert.background) {
                    alertParagraph.style.backgroundColor = alert.background;
                }
                if (alert.color) {
                    alertParagraph.style.color = alert.color;
                }

                alertSection.appendChild(alertParagraph);
            });

            // Prepend to main element
            const mainElement = document.querySelector('main');
            if (mainElement) {
                mainElement.prepend(alertSection);
            }
        } catch (error) {
            console.error('Error loading alerts:', error);
        }
    }
}

