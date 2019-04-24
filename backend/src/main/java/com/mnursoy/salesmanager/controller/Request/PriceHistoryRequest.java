package com.mnursoy.salesmanager.controller.Request;

import java.util.Calendar;

import org.springframework.format.annotation.DateTimeFormat;

public class PriceHistoryRequest {
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private final Calendar startDate;
	@DateTimeFormat(pattern = "dd/MM/yyyy")
	private final Calendar endDate;
	private final Long productId;

	public PriceHistoryRequest(Calendar startDate, Calendar endDate, Long productId) {
		this.startDate = startDate;
		this.endDate = endDate;
		this.productId = productId;
	}

	public Calendar getStartDate() {
		return startDate;
	}

	public Calendar getEndDate() {
		return endDate;
	}

	public Long getProductId() {
		return productId;
	}

	@Override
	public String toString() {
		final StringBuilder sb = new StringBuilder("PriceHistoryRequest [");
		sb.append("startDate=").append(startDate);
		sb.append(", endDate=").append(endDate);
		sb.append(", productId=").append(productId);
		sb.append("]");
		return sb.toString();
	}
}
