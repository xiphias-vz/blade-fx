
/**
 * Copyright (c) 2016-present Spryker Systems GmbH. All rights reserved.
 * Use of this software requires acceptance of the Evaluation License Agreement. See LICENSE file.
 */

'use strict';

const storeHolder = document.querySelector('.store-holder');
const storeRelationCheckbox = document.querySelectorAll('#product_form_edit_store_relation_id_stores .checkbox input[type="checkbox"]');
let supervisorStoreId = document.getElementById('supervisorStoreId');
if (Boolean(supervisorStoreId.value)) {
    for (let i = 0; i < storeRelationCheckbox.length; i++) {
        let idStore = storeRelationCheckbox[i].value;
        if (idStore !== supervisorStoreId.value) {
            storeRelationCheckbox[i].parentElement.parentElement.style.display = 'none';
        }
    }
    storeHolder.classList.remove('hidden');
}
