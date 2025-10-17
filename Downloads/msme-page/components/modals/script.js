document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {

        // --- Generic Modal Opener Function ---
        function setupModal(openBtnIds, overlayId, closeBtnId) {
            const overlay = document.getElementById(overlayId);
            const closeBtn = document.getElementById(closeBtnId);
            const openBtns = Array.isArray(openBtnIds) 
                ? openBtnIds.map(id => document.getElementById(id)) 
                : [document.getElementById(openBtnIds)];

            if (overlay && closeBtn && openBtns.every(btn => btn)) {
                const openModal = (e) => {
                    if(e) e.preventDefault();
                    overlay.classList.add('show');
                    document.body.classList.add('no-scroll');
                };

                const closeModal = () => {
                    overlay.classList.remove('show');
                    document.body.classList.remove('no-scroll');
                };

                openBtns.forEach(btn => btn.addEventListener('click', openModal));
                closeBtn.addEventListener('click', closeModal);
                
                overlay.addEventListener('click', (e) => {
                    if (e.target === overlay) {
                        closeModal();
                    }
                });
            }
        }

        // --- Initialize All Modals ---
        setupModal('open-gst-notice-modal-btn', 'gst-notice-modal-overlay', 'gst-notice-modal-close');
        setupModal('open-gst-options-modal-btn', 'gst-options-modal-overlay', 'gst-options-modal-close');
        setupModal('open-gst-filing-modal-btn', 'gst-filing-modal-overlay', 'gst-filing-modal-close');
        setupModal('open-docs-modal-btn', 'docs-modal-overlay', 'docs-modal-close');
        
        // Expert modal has multiple open buttons
        const openExpertModalBtns = document.querySelectorAll('.js-open-expert-modal');
        const expertModalOverlay = document.getElementById('expert-modal-overlay');
        const closeExpertModalBtn = document.getElementById('expert-modal-close');
        if (openExpertModalBtns.length && expertModalOverlay && closeExpertModalBtn) {
             const openModal = (e) => {
                e.preventDefault();
                expertModalOverlay.classList.add('show');
                document.body.classList.add('no-scroll');
            };
            const closeModal = () => {
                expertModalOverlay.classList.remove('show');
                document.body.classList.remove('no-scroll');
            };
            openExpertModalBtns.forEach(btn => btn.addEventListener('click', openModal));
            closeExpertModalBtn.addEventListener('click', closeModal);
            expertModalOverlay.addEventListener('click', e => {
                if (e.target === expertModalOverlay) closeModal();
            });
        }
        

        // --- OTP Form Logic ---
        const el = id => document.getElementById(id);
        const otpStep1 = el('otp-step1');
        const otpStep2 = el('otp-step2');
        const messageDiv = el('otp-message');

        if (otpStep1 && otpStep2 && messageDiv) {
            const showMsg = (text, type = '') => {
                messageDiv.textContent = text;
                messageDiv.className = 'otp-msg ' + (type ? 'otp-' + type : '');
                messageDiv.classList.remove('otp-hidden');
            };
            const hideMsg = () => messageDiv.classList.add('otp-hidden');

            el('otp-sendBtn').addEventListener('click', () => {
                hideMsg();
                const name = el('otp-name').value.trim();
                const mobile = el('otp-mobile').value.trim();

                if (!name || !/^[6-9]\d{9}$/.test(mobile)) {
                    showMsg('Please enter a valid name and 10-digit mobile number.', 'error');
                    return;
                }
                
                console.log(`Sending OTP to ${mobile} for ${name}`);
                showMsg('A dummy OTP 1234 has been sent to ' + mobile, 'success');
                otpStep1.classList.add('otp-hidden');
                otpStep2.classList.remove('otp-hidden');
            });

            el('otp-verifyBtn').addEventListener('click', () => {
                hideMsg();
                const otp = el('otp-input').value.trim();
                if (otp === "1234") {
                    showMsg('Verification successful! Our expert will call you shortly.', 'success');
                    otpStep2.classList.add('otp-hidden');
                    setTimeout(() => {
                        expertModalOverlay.classList.remove('show');
                        document.body.classList.remove('no-scroll');
                    }, 3000);
                } else {
                    showMsg('Invalid OTP. Please try again.', 'error');
                }
            });

            el('otp-resendBtn').addEventListener('click', () => {
                hideMsg();
                console.log(`Resending OTP to ${el('otp-mobile').value}`);
                showMsg('A new dummy OTP 1234 has been sent.', 'success');
            });
        }
        
        // --- Document Checklist Generator Logic ---
        const documentsData = {
            common: [
                { name: 'PAN Card of Applicant/Business', detail: 'The PAN must match the business or the primary promoter\'s name. (PDF/JPG, max 1MB)' },
                { name: 'Photograph of Stakeholders', detail: 'Passport-sized photo of all promoters, partners, or directors. (JPG, max 100KB)' },
                { name: 'Bank Account Proof', detail: 'Scanned copy of a cancelled cheque, bank statement, or passbook front page. The account must be in the business name. (PDF/JPG, max 1MB)' },
                { name: 'Authorised Signatory Details', detail: 'Photo and proof of appointment (e.g., Letter of Authorisation or Board Resolution). (PDF/JPG, max 100KB)' },
            ],
            business: {
                proprietor: [ { name: 'Owner\'s Aadhaar Card', detail: 'Must be linked to a mobile number for OTP verification.' } ],
                partnership: [ { name: 'Partnership Deed / LLP Certificate', detail: 'A notarized copy of the partnership deed or the incorporation certificate for an LLP.' }, { name: 'PAN & Address Proof of All Partners', detail: 'PAN cards and Aadhaar/Passport/Voter ID of every partner.' } ],
                company: [ { name: 'Certificate of Incorporation', detail: 'Issued by the Ministry of Corporate Affairs (MCA).' }, { name: 'Memorandum & Articles of Association', detail: 'The company\'s constitutional documents (MOA & AOA).' }, { name: 'PAN & Address Proof of All Directors', detail: 'PAN cards and Aadhaar/Passport/Voter ID of every director.' } ],
                other: [ { name: 'Entity Registration Certificate', detail: 'Registration certificate for the Society, Trust, Club, or other body.' }, { name: 'PAN & Address Proof of Promoters', detail: 'PAN cards and address proofs for all governing body members or trustees.' } ]
            },
            premise: {
                owned: [ { name: 'Proof of Ownership (Any One)', detail: 'Latest Property Tax Receipt, Municipal Khata copy, or a recent Electricity Bill (not older than 2 months).' } ],
                rented: [ { name: 'Rent or Lease Agreement', detail: 'Must be valid and clearly state the business purpose.' }, { name: 'Owner\'s Document (Any One)', detail: 'A copy of the property owner\'s Property Tax Receipt, Municipal Khata, or Electricity Bill as proof of their ownership.' } ],
                consented: [ { name: 'Consent Letter / NOC', detail: 'A No Objection Certificate from the legal owner of the property.' }, { name: 'Owner\'s Document (Any One)', detail: 'A copy of the property owner\'s Property Tax Receipt, Municipal Khata, or Electricity Bill to validate ownership.' } ]
            }
        };

        const generateBtn = el('generate-btn');
        const resultsDiv = el('checklist-results');
        const businessTypeSelect = el('business-type');
        const premiseTypeSelect = el('premise-type');
        const alertDiv = el('form-alert');

        if (generateBtn && resultsDiv && businessTypeSelect && premiseTypeSelect && alertDiv) {
            generateBtn.addEventListener('click', () => {
                const businessType = businessTypeSelect.value;
                const premiseType = premiseTypeSelect.value;

                if (!businessType || !premiseType) {
                    alertDiv.style.display = 'block';
                    return;
                }
                
                alertDiv.style.display = 'none';

                const commonDocs = documentsData.common;
                const businessDocs = documentsData.business[businessType];
                const premiseDocs = documentsData.premise[premiseType];

                resultsDiv.innerHTML = `
                    <div class="results-header">
                        <h3>Your Custom Checklist</h3>
                        <button class="btn btn-primary" id="print-btn"><i class="fas fa-print"></i> Print Checklist</button>
                    </div>
                    <div class="document-card">
                        <h4><i class="fas fa-files"></i>Common Documents (Required for All)</h4>
                        ${commonDocs.map(doc => `<div class="doc-item"><i class="fas fa-check-circle doc-item-icon"></i><div class="doc-item-content"><p>${doc.name}</p><span>${doc.detail}</span></div></div>`).join('')}
                    </div>
                    <div class="document-card">
                        <h4><i class="fas fa-briefcase"></i>Business Specific Documents</h4>
                        ${businessDocs.map(doc => `<div class="doc-item"><i class="fas fa-check-circle doc-item-icon"></i><div class="doc-item-content"><p>${doc.name}</p><span>${doc.detail}</span></div></div>`).join('')}
                    </div>
                    <div class="document-card">
                        <h4><i class="fas fa-map-marker-alt"></i>Address Proof Documents</h4>
                        ${premiseDocs.map(doc => `<div class="doc-item"><i class="fas fa-check-circle doc-item-icon"></i><div class="doc-item-content"><p>${doc.name}</p><span>${doc.detail}</span></div></div>`).join('')}
                    </div>
                `;

                resultsDiv.style.display = 'block';
                el('print-btn').addEventListener('click', () => window.print());
            });
        }

    }, 500);
});

