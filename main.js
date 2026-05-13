const projects = {
    nexus: {
        title: "Nexus IT - RMM & ERP",
        description: "Uma plataforma de monitoramento e gerenciamento remoto (RMM) integrada a um ERP robusto para MSPs (Managed Service Providers). O sistema permite o controle total de ativos, inventário de hardware/software, execução de scripts remotos e faturamento automatizado baseado em consumo.",
        features: [
            "Monitoramento em tempo real (CPU, RAM, Disco, Rede)",
            "Agente próprio em PowerShell/Python",
            "Gestão de contratos e faturamento recorrente (SaaS)",
            "Integração com MeshCentral para acesso remoto",
            "Sistema de tickets e helpdesk integrado"
        ],
        stack: ["Django", "PostgreSQL", "Docker", "MeshCentral", "Redis/Celery", "PowerShell"],
        code: `class Asset(models.Model):
    # Monitoramento em Tempo Real
    last_heartbeat = models.DateTimeField(null=True, blank=True)
    cpu_usage = models.FloatField(null=True, blank=True)
    ram_usage = models.FloatField(null=True, blank=True)
    
    @property
    def is_online(self):
        if not self.last_heartbeat:
            return False
        return self.last_heartbeat > timezone.now() - timedelta(minutes=5)

class Command(models.Model):
    asset = models.ForeignKey(Asset, on_delete=models.CASCADE)
    command_text = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')`
    },
    eventpro: {
        title: "EventPro Universal",
        description: "Sistema SaaS de alta performance para gestão de eventos e artistas. Unifica múltiplos escritórios em uma única arquitetura multi-tenant, permitindo o controle rigoroso de logística, contratos artísticos e fluxos financeiros complexos.",
        features: [
            "Arquitetura Multi-tenant (Isolamento de dados por organização)",
            "Gestão de contratos e pagamentos parcelados",
            "Módulo de logística (Hotéis, Voos, Camarim)",
            "Dashboard financeiro com P&L automático",
            "Geração de documentos em PDF dinâmica"
        ],
        stack: ["Django", "PostgreSQL", "Redis", "Bootstrap 5", "PDFKit"],
        code: `class Event(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    artist = models.ForeignKey(Artist, on_delete=models.PROTECT)
    date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    
    def calculate_net_profit(self):
        gross = self.payments.aggregate(Sum('amount'))['amount__sum'] or 0
        costs = self.expenses.aggregate(Sum('amount'))['amount__sum'] or 0
        return gross - costs`
    },
    gsteacher: {
        title: "GSTeacher AI",
        description: "Um coach de idiomas alimentado por Inteligência Artificial. O sistema processa áudio do usuário, transcreve e fornece feedback instantâneo sobre pronúncia, fluência e correções gramaticais usando modelos GPT de última geração.",
        features: [
            "Processamento de áudio em tempo real",
            "Análise de pronúncia com scores de 0 a 10",
            "Correção gramatical contextual",
            "Histórico de conversas com IA",
            "Sugestões de melhoria personalizadas"
        ],
        stack: ["Django", "OpenAI API", "Audio Web API", "JSONField", "Python"],
        code: `class AudioAnalysis(models.Model):    
    audio_file = models.FileField(upload_to='user_audio/')
    transcribed_text = models.TextField()
    pronunciation_score = models.FloatField()
    grammar_corrections = models.JSONField()
    
    def get_feedback_summary(self):
        return f"Pronúncia: {self.pronunciation_score}/10 | Gramática: {len(self.grammar_corrections)} erros"`
    },
    lastmile: {
        title: "Last Mile Delivery",
        description: "Sistema avançado de logística focado na última etapa da entrega. Inclui roteirização inteligente, rastreamento via geolocalização e um painel de despacho para controle em tempo real da frota.",
        features: [
            "Rastreamento em tempo real com Leaflet/Google Maps",
            "Geofencing para confirmação de chegada",
            "Comprovante de entrega digital com foto (PoD)",
            "Gestão de rotas e prioridades de entrega",
            "Dashboard operacional para despacho de pedidos"
        ],
        stack: ["Django", "PostgreSQL", "Geolocation API", "Leaflet.js", "Docker"],
        code: `class Delivery(models.Model):
    tracking_code = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES)
    latitude = models.DecimalField(max_digits=10, decimal_places=7)
    longitude = models.DecimalField(max_digits=10, decimal_places=7)

class DeliveryProof(models.Model):
    delivery = models.OneToOneField(Delivery, on_delete=models.CASCADE)
    photo = models.ImageField(upload_to='proofs/')
    receiver_name = models.CharField(max_length=255)`
    },
    agendae: {
        title: "Agendaê - SaaS de Agendamento",
        description: "Plataforma SaaS para profissionais que dependem de agendamentos recorrentes. O sistema resolve a complexidade de calendários compartilhados, pagamentos antecipados e lembretes automáticos via WhatsApp/E-mail.",
        features: [
            "Arquitetura Multi-tenant (isolamento total de dados)",
            "Lógica de recorrência complexa (diária, semanal, mensal)",
            "Integração com gateways de pagamento (Pix/Cartão)",
            "Notificações automáticas inteligentes",
            "Landing page personalizada para cada profissional"
        ],
        stack: ["Django", "PostgreSQL", "Redis", "Celery", "Stripe/Asaas"],
        code: `class Appointment(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    service = models.ForeignKey(Service, on_delete=models.PROTECT)
    start_time = models.DateTimeField()
    end_time = models.DateTimeField()
    
    def check_conflict(self):
        return Appointment.objects.filter(
            organization=self.organization,
            start_time__lt=self.end_time,
            end_time__gt=self.start_time
        ).exists()`
    },
    finance: {
        title: "MFO Financial Hub",
        description: "Um ecossistema financeiro B2B2C de alta segurança. Focado em gestão de patrimônio e controle de caixa empresarial, o sistema utiliza criptografia de ponta e integração com APIs de Open Finance.",
        features: [
            "Criptografia AES-256 para dados sensíveis",
            "Cofre de arquivos (Vault) para documentos sigilosos",
            "Dashboard de P&L e fluxo de caixa em tempo real",
            "Gestão de ativos (Renda Fixa, Variável, Cripto)",
            "Sistema de metas e planejamento financeiro"
        ],
        stack: ["Django", "PostgreSQL", "AES-256 Encryption", "Decoupled Architecture", "Docker"],
        code: `class Account(models.Model):
    organization = models.ForeignKey(Organization, on_delete=models.CASCADE)
    balance = models.DecimalField(max_digits=15, decimal_places=2)
    # Campos Criptografados
    bank_name = EncryptedCharField(max_length=255)
    account_number = EncryptedCharField(max_length=255)

class Transaction(models.Model):
    account = models.ForeignKey(Account, on_delete=models.CASCADE)
    amount = models.DecimalField(max_digits=15, decimal_places=2)
    is_confirmed = models.BooleanField(default=True)`
    }
};

function openModal(id) {
    const project = projects[id];
    const modal = document.getElementById('projectModal');
    const body = document.getElementById('modalBody');

    body.innerHTML = `
        <h2 style="font-size: 2.5rem; margin-bottom: 1.5rem;">${project.title}</h2>
        <div style="display: flex; gap: 1rem; flex-wrap: wrap; margin-bottom: 2rem;">
            ${project.stack.map(s => `<span class="tag" style="background: rgba(14, 165, 233, 0.1); color: var(--primary); border-color: var(--primary);">${s}</span>`).join('')}
        </div>
        
        <p style="font-size: 1.1rem; color: var(--text-secondary); margin-bottom: 2rem;">${project.description}</p>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 3rem; margin-top: 3rem;">
            <div>
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);"><i class="fas fa-star" style="color: var(--primary);"></i> Funcionalidades Chave</h4>
                <ul style="list-style: none; color: var(--text-secondary);">
                    ${project.features.map(f => `<li style="margin-bottom: 0.8rem; display: flex; align-items: start; gap: 0.75rem;"><i class="fas fa-check" style="color: var(--accent); margin-top: 0.3rem;"></i> ${f}</li>`).join('')}
                </ul>
            </div>
            <div>
                <h4 style="margin-bottom: 1rem; color: var(--text-primary);"><i class="fas fa-code" style="color: var(--primary);"></i> Trecho do Modelo (Django)</h4>
                <div class="code-window" style="display: block; margin-top: 0;">
                    <div class="code-header">
                        <div class="dot red"></div>
                        <div class="dot yellow"></div>
                        <div class="dot green"></div>
                        <span style="font-size: 0.7rem; color: var(--text-secondary); margin-left: 1rem;">models.py</span>
                    </div>
                    <pre class="code-content"><code>${project.code}</code></pre>
                </div>
                <p style="font-size: 0.8rem; color: var(--text-secondary); margin-top: 1rem; font-style: italic;">* Código simplificado para fins de demonstração.</p>
            </div>
        </div>
    `;

    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.getElementById('projectModal');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Close on background click
window.onclick = function(event) {
    const modal = document.getElementById('projectModal');
    if (event.target == modal) {
        closeModal();
    }
}

// Simple reveal animation
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.project-card, .skill-card, .section-header').forEach(el => {
    observer.observe(el);
});
