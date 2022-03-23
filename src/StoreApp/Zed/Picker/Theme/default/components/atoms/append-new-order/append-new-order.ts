import Component from 'ShopUi/models/component';
import $ from 'jquery/dist/jquery';

export default class AppendNewOrder extends Component {
    protected checkForNewOrderInterval: number = 15000;

    protected readyCallback() {}

    protected init(): void {
        setInterval(this.checkForNewPickUps, this.checkForNewOrderInterval);
    }

    protected checkForNewPickUps(): void {
        const url = window.location.origin + '/picker/collect-by-customer/provideListOfOrders';

        $.ajax(url, {
            type: 'post',
            dataType: 'json',
            success(data, status, xhr) {
                if (data.newOrders) {
                    window.location.reload();
                }
            }
        });
    }
}
