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
