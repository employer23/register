document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    const registrationTypeRadios = document.querySelectorAll('input[name="registrationType"]');
    const teamInfo = document.getElementById('teamInfo');
    const teamNameInput = document.getElementById('teamName');
    const teamSizeInput = document.getElementById('teamSize');
    const successModal = document.getElementById('successModal');

    // 监听报名形式变化
    registrationTypeRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (this.value === 'team') {
                teamInfo.style.display = 'block';
                teamNameInput.required = true;
                teamSizeInput.required = true;
            } else {
                teamInfo.style.display = 'none';
                teamNameInput.required = false;
                teamSizeInput.required = false;
                teamNameInput.value = '';
                teamSizeInput.value = '';
            }
        });
    });

    // 手机号码格式验证
    const phoneInput = document.getElementById('phone');
    phoneInput.addEventListener('input', function() {
        // 只允许数字、空格、短横线和括号
        this.value = this.value.replace(/[^\d\s\-\(\)]/g, '');
    });

    // 表单提交处理
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // 获取表单数据
        const formData = new FormData(form);
        
        // 验证手机号码格式（简单验证）
        const phonePattern = /^[\d\s\-\(\)]{10,}$/;
        if (!phonePattern.test(formData.get('phone').replace(/\s/g, ''))) {
            alert('请输入有效的手机号码');
            return;
        }

        // 如果是小队报名，验证小队信息
        if (formData.get('registrationType') === 'team') {
            if (!formData.get('teamName') || !formData.get('teamSize')) {
                alert('请填写完整的小队信息');
                return;
            }
        }

        // 显示提交按钮加载状态
        const submitBtn = form.querySelector('.submit-btn');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = '提交中...';
        submitBtn.disabled = true;

        // 提交到Netlify Forms
        fetch('/', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams(formData).toString()
        })
        .then(response => {
            if (response.ok) {
                // 重置按钮状态
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
                
                // 显示成功模态框
                showSuccessModal();
                
                // 重置表单
                form.reset();
                teamInfo.style.display = 'none';
                teamNameInput.required = false;
                teamSizeInput.required = false;
            } else {
                throw new Error('提交失败');
            }
        })
        .catch(error => {
            // 重置按钮状态
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            alert('提交失败，请重试');
            console.error('提交错误:', error);
        });
    });

    // 实时表单验证
    const inputs = form.querySelectorAll('input[required], select[required]');
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
});

// 字段验证函数
function validateField(field) {
    const value = field.value.trim();
    const fieldName = field.previousElementSibling.textContent.replace(' *', '');
    
    // 移除之前的错误消息
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    field.classList.remove('error');
    
    // 验证逻辑
    let isValid = true;
    let errorMessage = '';
    
    if (field.required && !value) {
        isValid = false;
        errorMessage = `请填写${fieldName}`;
    } else if (field.type === 'tel' && value) {
        const phonePattern = /^[\d\s\-\(\)]{10,}$/;
        if (!phonePattern.test(value.replace(/\s/g, ''))) {
            isValid = false;
            errorMessage = '请输入有效的手机号码';
        }
    }
    
    if (!isValid) {
        field.classList.add('error');
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = errorMessage;
        errorDiv.style.color = '#e53e3e';
        errorDiv.style.fontSize = '0.875rem';
        errorDiv.style.marginTop = '4px';
        field.parentNode.appendChild(errorDiv);
    }
    
    return isValid;
}

// 显示成功模态框
function showSuccessModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'block';
    
    // 点击模态框外部关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
}

// 关闭模态框
function closeModal() {
    const modal = document.getElementById('successModal');
    modal.style.display = 'none';
}

// 键盘事件处理
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});

// 表单自动保存到本地存储（可选功能）
function saveFormData() {
    const form = document.getElementById('registrationForm');
    const formData = new FormData(form);
    const data = {};
    
    for (let [key, value] of formData.entries()) {
        data[key] = value;
    }
    
    localStorage.setItem('registrationFormData', JSON.stringify(data));
}

// 恢复表单数据（可选功能）
function restoreFormData() {
    const savedData = localStorage.getItem('registrationFormData');
    if (savedData) {
        const data = JSON.parse(savedData);
        const form = document.getElementById('registrationForm');
        
        for (let [key, value] of Object.entries(data)) {
            const field = form.querySelector(`[name="${key}"]`);
            if (field) {
                if (field.type === 'radio') {
                    const radioButton = form.querySelector(`[name="${key}"][value="${value}"]`);
                    if (radioButton) {
                        radioButton.checked = true;
                        radioButton.dispatchEvent(new Event('change'));
                    }
                } else {
                    field.value = value;
                }
            }
        }
    }
}

// 页面加载时恢复数据
document.addEventListener('DOMContentLoaded', function() {
    // restoreFormData(); // 取消注释以启用自动恢复功能
});

// 表单数据变化时自动保存
document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('registrationForm');
    form.addEventListener('input', function() {
        // saveFormData(); // 取消注释以启用自动保存功能
    });
});
