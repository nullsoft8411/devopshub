<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Certificate of Completion</title>
    <style>
        body {
            font-family: 'Helvetica', sans-serif;
            margin: 0;
            padding: 0;
            background: #f9fafb;
        }
        .certificate {
            width: 100%;
            max-width: 800px;
            margin: 0 auto;
            padding: 40px;
            background: white;
            border: 2px solid #e5e7eb;
            box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 40px;
        }
        .title {
            font-size: 36px;
            color: #1f2937;
            margin-bottom: 10px;
        }
        .subtitle {
            font-size: 24px;
            color: #4b5563;
        }
        .content {
            text-align: center;
            margin: 40px 0;
        }
        .user-name {
            font-size: 28px;
            color: #1f2937;
            margin-bottom: 20px;
        }
        .achievement {
            font-size: 20px;
            color: #4b5563;
            margin-bottom: 30px;
        }
        .details {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin: 40px 0;
        }
        .detail-item {
            text-align: left;
            padding: 10px;
        }
        .detail-label {
            font-size: 14px;
            color: #6b7280;
        }
        .detail-value {
            font-size: 16px;
            color: #1f2937;
            font-weight: bold;
        }
        .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #e5e7eb;
        }
        .verification {
            font-size: 12px;
            color: #6b7280;
        }
        .qr-code {
            margin-top: 20px;
            text-align: center;
        }
    </style>
</head>
<body>
    <div class="certificate">
        <div class="header">
            <h1 class="title">Certificate of Completion</h1>
            <div class="subtitle">DevOps Training Hub</div>
        </div>

        <div class="content">
            <div class="user-name">{{ $user->name }}</div>
            <div class="achievement">
                has successfully completed the lab<br>
                <strong>{{ $lab->title }}</strong>
            </div>
        </div>

        <div class="details">
            <div class="detail-item">
                <div class="detail-label">Score Achieved</div>
                <div class="detail-value">{{ $certificate->score }}%</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Time Taken</div>
                <div class="detail-value">{{ $certificate->time_taken }}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Completion Date</div>
                <div class="detail-value">{{ $certificate->issued_at->format('F j, Y') }}</div>
            </div>
            <div class="detail-item">
                <div class="detail-label">Certificate ID</div>
                <div class="detail-value">{{ $certificate->id }}</div>
            </div>
        </div>

        <div class="footer">
            <div class="verification">
                Verify this certificate at:<br>
                {{ $verification_url }}
            </div>
            <div class="qr-code">
                {!! $qr_code !!}
            </div>
        </div>
    </div>
</body>
</html>